<?php
// send_contact.php
// Basic server-side handler to email contact form submissions with optional attachment.
// IMPORTANT: This uses PHP's mail() and requires a properly configured mail transport on the server.

// Destination: send contact form to this address
$to = 'Js.evropa@seznam.cz';

/* SMTP configuration — edit these to use Hostinger SMTP
 * Provide the SMTP password below (or set to empty to use PHP mail() fallback).
 */
$SMTP_ENABLED = true;
$SMTP_HOST = 'smtp.hostinger.com';
$SMTP_PORT = 587;
$SMTP_USER = 'fahad@fahadqa.com';
$SMTP_PASS = '200419681969CHsiii@'; // <-- replace with the SMTP password from Hostinger
$SMTP_SECURE = 'tls'; // 'tls' (STARTTLS) or 'ssl' for implicit TLS

// Sender address shown in emails
$fromEmail = 'fahad@fahadqa.com';
$fromName  = 'مركز فهد القرني';

// Helper to sanitize
function s($v){ return htmlspecialchars(trim($v), ENT_QUOTES, 'UTF-8'); }

$fullName = $_POST['fullName'] ?? '';
$phone = $_POST['phone'] ?? '';
$whatsapp = $_POST['whatsapp'] ?? '';
$country = $_POST['country'] ?? '';
$message = $_POST['message'] ?? '';

if (!$fullName || !$phone || !$message) {
    // missing required
    http_response_code(400);
    echo "<p>الرجاء ملء الحقول الإلزامية.</p><p><a href=\"index.html#contact\">العودة</a></p>";
    exit;
}

// Basic file checks
$attachmentPart = '';
$hasAttachment = false;
if (!empty($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
    $fileTmp = $_FILES['attachment']['tmp_name'];
    $fileName = basename($_FILES['attachment']['name']);
    $fileSize = $_FILES['attachment']['size'];
    $fileType = $_FILES['attachment']['type'] ?: mime_content_type($fileTmp);

    // limit size to 8MB
    if ($fileSize > 8 * 1024 * 1024) {
        echo "<p>حجم الملف أكبر من الحد المسموح (8 ميجابايت).</p><p><a href=\"index.html#contact\">العودة</a></p>";
        exit;
    }

    $allowed = [
        'image/jpeg','image/png','image/gif','application/pdf',
        'application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!in_array($fileType, $allowed)) {
        // allow even if mime is unknown; not overly strict here but warn
        // proceed but keep original filename and type
    }

    $data = chunk_split(base64_encode(file_get_contents($fileTmp)));
    $hasAttachment = true;
}

$subject = "طلب استشارة - " . s($fullName);
$boundary = md5(time());

// Build headers for the raw MIME message
$headers = "From: {$fromName} <{$fromEmail}>\r\n";
$headers .= "Reply-To: " . s($phone) . " <" . s($phone) . ">\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

// message body (HTML)
$body = "--{$boundary}\r\n";
$body .= "Content-Type: text/html; charset=\"UTF-8\"\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= "<h2>طلب استشارة</h2>\r\n";
$body .= "<p><strong>الاسم:</strong> " . s($fullName) . "</p>\r\n";
$body .= "<p><strong>الهاتف:</strong> " . s($phone) . "</p>\r\n";
$body .= "<p><strong>واتساب:</strong> " . s($whatsapp ?: '-') . "</p>\r\n";
$body .= "<p><strong>الدولة:</strong> " . s($country ?: '-') . "</p>\r\n";
$body .= "<p><strong>الرسالة:</strong><br>" . nl2br(s($message)) . "</p>\r\n\r\n";

if ($hasAttachment) {
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: {$fileType}; name=\"" . s($fileName) . "\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"" . s($fileName) . "\"\r\n\r\n";
    $body .= $data . "\r\n\r\n";
}

$body .= "--{$boundary}--\r\n";

// send
// Full raw message (headers + body) to send via SMTP or mail()
$rawMessage = "Date: " . date('r') . "\r\n";
$rawMessage .= "To: {$to}\r\n";
$rawMessage .= "Subject: {$subject}\r\n";
$rawMessage .= $headers . "\r\n";
$rawMessage .= $body;

// Try SMTP if configured and password provided
$sent = false;
if ($SMTP_ENABLED && !empty($SMTP_PASS) && $SMTP_PASS !== 'CHANGE_ME') {
    // simple SMTP client using STARTTLS + AUTH LOGIN
    $errno = 0; $errstr = '';
    $fp = stream_socket_client("tcp://{$SMTP_HOST}:{$SMTP_PORT}", $errno, $errstr, 15);
    if ($fp) {
        stream_set_timeout($fp, 15);
        $res = fgets($fp);
        // ehlo
        fwrite($fp, "EHLO localhost\r\n");
        while ($line = fgets($fp)) { if (substr($line,3,1) != '-') break; }
        // starttls if requested
        if (strtolower($SMTP_SECURE) === 'tls') {
            fwrite($fp, "STARTTLS\r\n");
            $line = fgets($fp);
            if (strpos($line, '220') === 0) {
                stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
                // EHLO again after TLS
                fwrite($fp, "EHLO localhost\r\n");
                while ($line = fgets($fp)) { if (substr($line,3,1) != '-') break; }
            }
        }
        // auth
        fwrite($fp, "AUTH LOGIN\r\n");
        fgets($fp);
        fwrite($fp, base64_encode($SMTP_USER) . "\r\n");
        fgets($fp);
        fwrite($fp, base64_encode($SMTP_PASS) . "\r\n");
        $authRes = fgets($fp);
        if (strpos($authRes, '235') === 0) {
            fwrite($fp, "MAIL FROM:<{$fromEmail}>\r\n"); fgets($fp);
            fwrite($fp, "RCPT TO:<{$to}>\r\n"); fgets($fp);
            fwrite($fp, "DATA\r\n"); fgets($fp);
            fwrite($fp, $rawMessage . "\r\n.\r\n");
            $dataRes = fgets($fp);
            if (strpos($dataRes, '250') === 0) $sent = true;
            fwrite($fp, "QUIT\r\n"); fgets($fp);
        }
        fclose($fp);
    }
}

// fallback to PHP mail() if SMTP not used or failed
if (! $sent) {
    $sent = mail($to, $subject, $body, $headers);
}

?><!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>حالة الإرسال</title>
<style>body{font-family:Arial, Helvetica, sans-serif;direction:rtl;padding:2rem;background:#f7f7f7;color:#222} .card{max-width:720px;margin:2rem auto;padding:1.5rem;background:white;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,0.06);} a{color:#1E88C7;text-decoration:none}</style>
</head>
<body>
<div class="card">
<?php if ($sent): ?>
    <h2>تم إرسال الطلب</h2>
    <p>شكراً لك، تم إرسال طلب الاستشارة بنجاح. سنوافيك بالرد قريباً.</p>
    <p><a href="index.html">العودة إلى الصفحة الرئيسية</a></p>
<?php else: ?>
    <h2>حدث خطأ</h2>
    <p>عذرًا، حدث خطأ أثناء إرسال رسالتك. الرجاء المحاولة لاحقًا أو التواصل عبر الواتساب.</p>
    <p><a href="index.html#contact">العودة إلى نموذج الاتصال</a></p>
<?php endif; ?>
</div>
</body>
</html>