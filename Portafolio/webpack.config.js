const path = require('path');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        context: __dirname, // Establece la base de las rutas en la carpeta Portafolio
        entry: './main.js', // Tu archivo principal que importa los demás módulos
        output: {
            filename: 'bundle.js', // El nombre del archivo final empaquetado
            path: path.resolve(__dirname, 'dist'), // Se creará en la carpeta /dist
        },
        devServer: {
            static: path.resolve(__dirname, './'), // Sirve los archivos desde la carpeta Portafolio
            port: 3000, // Puerto del servidor de desarrollo
            open: true, // Abre el navegador automáticamente
            hot: true, // Habilita recarga en caliente (Hot Module Replacement)
        },
        devtool: isProduction ? 'source-map' : 'eval-source-map',
    };
};