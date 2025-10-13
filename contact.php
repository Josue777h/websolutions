<?php
// Configuración de correo
$to = "josuesepulvedassj@gmail.com";
$subject = "Nuevo mensaje desde tu portafolio";

// Verificar que el formulario fue enviado por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Sanitizar y obtener datos del formulario
    $nombre = htmlspecialchars(trim($_POST['nombre'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $asunto = htmlspecialchars(trim($_POST['asunto'] ?? ''));
    $mensaje = htmlspecialchars(trim($_POST['mensaje'] ?? ''));
    
    // Validaciones
    $errors = [];
    
    if (empty($nombre)) {
        $errors[] = "El nombre es requerido";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "El email es requerido y debe ser válido";
    }
    
    if (empty($asunto)) {
        $errors[] = "El asunto es requerido";
    }
    
    if (empty($mensaje)) {
        $errors[] = "El mensaje es requerido";
    }
    
    // Si no hay errores, procesar el envío
    if (empty($errors)) {
        
        // Crear el contenido del email
        $email_content = "
        <html>
        <head>
            <title>Nuevo mensaje desde tu portafolio</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #58a6ff, #0969da); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #58a6ff; }
                .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #58a6ff; }
                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>📧 Nuevo Mensaje desde tu Portafolio</h2>
                    <p>Has recibido un nuevo mensaje de contacto</p>
                </div>
                <div class='content'>
                    <div class='field'>
                        <div class='label'>👤 Nombre:</div>
                        <div class='value'>" . $nombre . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>📧 Email:</div>
                        <div class='value'>" . $email . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>📋 Asunto:</div>
                        <div class='value'>" . $asunto . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>💬 Mensaje:</div>
                        <div class='value'>" . nl2br($mensaje) . "</div>
                    </div>
                </div>
                <div class='footer'>
                    <p>Este mensaje fue enviado desde tu portafolio web el " . date('d/m/Y H:i:s') . "</p>
                </div>
            </div>
        </body>
        </html>";
        
        // Configurar headers del email
        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            'From: ' . $nombre . ' <' . $email . '>',
            'Reply-To: ' . $email,
            'X-Mailer: PHP/' . phpversion()
        ];
        
        // Enviar el email
        if (mail($to, $subject, $email_content, implode("\r\n", $headers))) {
            
            // Enviar respuesta automática al usuario
            $user_subject = "Gracias por contactarme - Josue Sepúlveda";
            $user_message = "
            <html>
            <head>
                <title>Gracias por tu mensaje</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #58a6ff, #0969da); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <h2>¡Gracias por contactarme!</h2>
                    </div>
                    <div class='content'>
                        <p>Hola <strong>" . $nombre . "</strong>,</p>
                        <p>He recibido tu mensaje y te responderé lo antes posible.</p>
                        <p>Mientras tanto, puedes revisar mi trabajo en:</p>
                        <ul>
                            <li>🔗 Mi portafolio web</li>
                            <li>💼 Mis proyectos en GitHub</li>
                            <li>📱 Conecta conmigo en LinkedIn</li>
                        </ul>
                        <p>¡Que tengas un excelente día!</p>
                        <p><strong>Josue Sepúlveda</strong><br>
                        Diseñador y Desarrollador Web</p>
                    </div>
                    <div class='footer'>
                        <p>Este es un mensaje automático. Por favor no responder a este email.</p>
                    </div>
                </div>
            </body>
            </html>";
            
            $user_headers = [
                'MIME-Version: 1.0',
                'Content-type: text/html; charset=UTF-8',
                'From: Josue Sepúlveda <josuesepulvedassj@gmail.com>',
                'X-Mailer: PHP/' . phpversion()
            ];
            
            mail($email, $user_subject, $user_message, implode("\r\n", $user_headers));
            
            // Respuesta exitosa
            $response = [
                'success' => true,
                'message' => '¡Mensaje enviado correctamente! Te responderé pronto.'
            ];
            
        } else {
            $response = [
                'success' => false,
                'message' => 'Error al enviar el mensaje. Por favor intenta de nuevo.'
            ];
        }
        
    } else {
        $response = [
            'success' => false,
            'message' => 'Por favor corrige los siguientes errores: ' . implode(', ', $errors)
        ];
    }
    
    // Enviar respuesta JSON
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
    
} else {
    // Si no es POST, redirigir al portafolio
    header('Location: index.html');
    exit;
}
?>
