// Configuração PostCSS (CommonJS) para Tailwind CSS v4
// Usar module.exports garante que o arquivo seja lido pelo PostCSS no Node.
// Se este arquivo estiver em ESM (export default) o PostCSS pode ignorar e as utilidades somem.

module.exports = {
	plugins: {
		'@tailwindcss/postcss': {},
		autoprefixer: {},
	},
}

