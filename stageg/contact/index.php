<?php
// Función para limpiar y validar los datos del formulario
function limpiarEntrada($entrada) {
    $entrada = trim($entrada);
    $entrada = stripslashes($entrada);
    $entrada = htmlspecialchars($entrada);
    return $entrada;
}

$mensajeExito = "";
$mensajeError = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conexión a la base de datos (reemplaza con tus propios datos)
    $servidor = "localhost";
    $usuario = "u972271482_usuarios";
    $contrasena = "Formularios2023";
    $base_de_datos = "u972271482_formulario";

    // Crea una conexión
    $conexion = new mysqli($servidor, $usuario, $contrasena, $base_de_datos);

    // Verifica la conexión
    if ($conexion->connect_error) {
        die("Error de conexión a la base de datos: " . $conexion->connect_error);
    }

    // Limpia y valida los datos del formulario
    $nombre = limpiarEntrada($_POST["nombre"]);
    $apellido = limpiarEntrada($_POST["apellido"]);
    $telefono = limpiarEntrada($_POST["telefono"]);
    $mensaje = limpiarEntrada($_POST["mensaje"]);

    // Valida los datos del formulario (puedes agregar más validaciones)
    if (empty($nombre) || empty($apellido) || empty($telefono) || empty($mensaje)) {
        $mensajeError = "Por favor, complete todos los campos del formulario.";
    } else {
        // Destinatario de correo electrónico (reemplaza con tu dirección de correo)
        $destinatario = "edevis18@gmail.com";
        $asunto = "Mensaje de contacto de $nombre $apellido";

        $contenido = "Nombre: $nombre $apellido\n";
        $contenido .= "Teléfono: $telefono\n";
        $contenido .= "Mensaje:\n$mensaje";

        // Envía el correo
        if (mail($destinatario, $asunto, $contenido)) {
            $mensajeExito = "The message has been sent successfully!";
        } else {
            $mensajeError = "There was a problem sending the message. Try again!.";
        }

        // Cierra la conexión a la base de datos
        $conexion->close();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="shortcut icon" href="img/icon.png" type="image/x-icon">
  <meta name="description" content="Write to our contact form with any questions or requirements you may need.">
  <meta property="og:image" content="img/ogg.jpg">
  <meta property="og:image:width" content="600">
  <meta property="og:image:height" content="400">
  <meta property="og:description" content="Stage G">
  <meta http-equiv="cache-control" content="max-age=0" />
  <meta http-equiv="cache-control" content="no-cache" />
  <meta http-equiv="expires" content="0" />
  <meta http-equiv="expires" content="Tue, 01 Jan 2050 1:00:00 GMT" />
  <meta http-equiv="pragma" content="no-cache" />
  <link rel="stylesheet" href="style.css">
  <link rel="canonical" href="https://stagegphotos.com/contact-form.html">
  <script src="https://kit.fontawesome.com/65c161370e.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <title>Stage G: Contact Form</title>
</head>
<body>

<nav class="navbar">
        <div class="logo">
        	<a href="https://stagegphotos.com/" target="_blank">
                <img src="img/logo.png" alt="">
            </a></div>
      
        <!-- Ícono de hamburguesa -->
        <div class="menu-toggle" onclick="toggleMenu()">&#9776;</div>
        <ul class="menu" id="menu">
            <li><a href="https://stagegphotos.com/">Home</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="#moreinfo" data-scroll="moreinfo-link" >More Info</a></li>
            <!-- Agregar iconos sociales -->
            <li><a href="https://www.instagram.com/stagegphotos/" target="_blank"><i class="fab fa-instagram"></i></a></li>
            <li><a href="https://www.facebook.com/stagegphotos/" target="_blank"><i class="fab fa-facebook"></i></a></li>
            <li><a href="mailto:info@stagegphotos.com" target="_blank"><i class="fa fa-envelope" aria-hidden="true"></i></a></li>
        </ul>
    </nav>

  <script>
        function toggleMenu() {
            var menu = document.getElementById('menu');
            menu.classList.toggle('open');
        }
    </script>

    <script>
      
document.addEventListener("DOMContentLoaded", function () {
    // Selecciona todos los enlaces con el atributo data-scroll
    const scrollLinks = document.querySelectorAll('[data-scroll]');

    // Agrega un evento de clic a cada enlace
    scrollLinks.forEach(function (scrollLink) {
        scrollLink.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el comportamiento predeterminado del enlace

            const targetId = this.getAttribute('href').substring(1); // Obtiene el ID del objetivo
            const targetElement = document.getElementById(targetId); // Encuentra el elemento objetivo

            if (targetElement) {
                // Calcula la distancia hasta el elemento objetivo
                const offset = targetElement.getBoundingClientRect().top + window.scrollY;

                // Realiza el desplazamiento suave
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });
});

    </script>

     <div class="hero">
        <h1>Contact Us</h1>
        <p>Contact us, using the form</p>
        <a href="https://wa.link/3dtm30" class="btn">Hire Service Now!</a> <!-- Botón Get Started -->
    </div><br>

   

<center><h2 style="color:white;" >Contact Form</h2></center>
 <div class="container">
        <form action="" method="post">
            <div class="form-group">
                <label for="nombre">Name:</label>
                <input type="text" id="nombre" name="nombre" required>
            </div>
            
            <div class="form-group">
                <label for="apellido">Last Name:</label>
                <input type="text" id="apellido" name="apellido" required>
            </div>
            
            <div class="form-group">
                <label for="telefono">Phone:</label>
                <input type="tel" id="telefono" name="telefono" required>
            </div>
            
            <div class="form-group">
                <label for="mensaje">Message:</label>
                <textarea id="mensaje" name="mensaje" rows="4" required></textarea>
            </div>
            
            <div class="form-group">
                <input type="submit" value="Send form">
            </div>
        </form>

 <?php
 
if (!empty($mensajeExito)) {
    echo "<h2 class='exito' style='color: white;'>$mensajeExito</h2>";
}
if (!empty($mensajeError)) {
    echo "<p class='error'>$mensajeError</p>";
}

    ?>

    </div> 

 <section id="moreinfo" class="contacts">
        <h2 style="color:#e9cb78;" >Our Contacts</h2>
        <div class="contact-grid">
            <div class="contact-column">
                <i class="fa fa-phone contact-icon"></i>
                
                <p class="contact-text">Phone: <a href="tel:3463865804" style="color:white; text-decoration: none; color:#e9cb78;" >+1 (346) 386 5804</p></a>
            </div>
            <div class="contact-column">
                <i class="fa fa-envelope contact-icon"></i>
                <p class="contact-text">Email: info@stagegphotos.com</p>
            </div>
            <div class="contact-column">
                <i class="fa fa-map-marker contact-icon"></i>
                <p class="contact-text">Location: Houston, Texas</p>
            </div>
        </div>
    </section>

<footer class="footer">
  <center><p>© Copyright 2023 | Stage G - All Rights Reserved, Developed by <a href="https://linktr.ee/edevisr" style="color:#e9cb78; text-decoration: none;" >edevisr</a></p></center>
</footer>

<script>
        // Obtener todas las imágenes en la página
        const images = document.querySelectorAll('img');

        // Aplicar lazy loading a todas las imágenes
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    </script>


<div class="whatsapp-button">
    <a href="https://wa.link/3dtm30" target="_blank" rel="noopener noreferrer">
        <img src="img/whatsapp.png" alt="WhatsApp Icon">
        <span>Online Agent! </span>
    </a>
</div>

<style>
  
/* CAROUSEL */

.carousel-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 900px; /* Ancho máximo del carrusel */
    margin: 0 auto;
}

.carousel-wrapper {
    display: flex;
    transition: transform 0.5s ease; /* Transición suave para el desplazamiento */
}

.carousel-slide {
    flex: 0 0 33.33%; /* Mostrar tres imágenes a la vez */
}

.carousel-slide img {
    width: 100%;
    height: auto;
    display: block;
}

.carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 5px;
}

.prev-button {
    left: 10px;
}

.next-button {
    right: 10px;
}

/* Estilos para pantallas más pequeñas (por ejemplo, dispositivos móviles) */
@media (max-width: 600px) {
    .carousel-container {
        max-width: 100%; /* Ancho máximo para pantallas más pequeñas */
    }
    
    .carousel-slide {
        flex: 0 0 50%; /* Mostrar dos imágenes a la vez en pantallas más pequeñas */
    }
    
    /* Ajusta otros estilos según sea necesario para dispositivos móviles */
}

</style>

</body>
</html>