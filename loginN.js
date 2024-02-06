const puppeteer = require("puppeteer");
require("dotenv").config();

const login = async (req, res) => {
  const { username, password } = req.body; // Obteniendo credenciales desde el cuerpo de la solicitud

  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  try {
    const page = await browser.newPage();

    // Navegar al sitio de inicio de sesión
    await page.goto("https://netflix.com/manageaccountaccess");


    // Ajustar el tamaño de la ventana del navegador
    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector('[data-uia="login-submit-button"]');
    await page.waitForSelector('[data-uia="login-field"]');

    // Completar el formulario de inicio de sesión
       await page.type('[data-uia="login-field"]', username); // Asegúrate de usar el selector correcto para el campo de usuario
    await page.type('[data-uia="password-field"]', password); // Asegúrate de usar el selector correcto para el campo de contraseña
    await page.click('button[data-uia="login-submit-button"]'); // Asegúrate de usar el selector correcto para el botón de inicio de sesión
    console.log(" boton clicked. Login successful");

    // Esperar a que se complete el inicio de sesión (ajustar según sea necesario)
    await page.waitForNavigation( { waitUntil: 'networkidle0', timeout: 40000 } );

    // Opcional: tomar una captura de pantalla después del inicio de sesión
    await page.screenshot({ path: 'login_success.png' });

    // Confirmar el inicio de sesión exitoso
    res.send("Login successful, screenshot saved as login_success.png");
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong during the login process: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { login };