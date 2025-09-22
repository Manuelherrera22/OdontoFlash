const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando deploy automático a Netlify...');

try {
  // 1. Build the project
  console.log('📦 Construyendo el proyecto...');
  execSync('npm run build', { stdio: 'inherit' });

  // 2. Create deployment package
  console.log('📁 Preparando archivos para deploy...');
  const buildDir = path.join(__dirname, '..', '.next');
  const outDir = path.join(__dirname, '..', 'out');
  
  // Ensure output directory exists
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Copy build files
  execSync(`cp -r ${buildDir}/* ${outDir}/`, { stdio: 'inherit' });

  // 3. Deploy to Netlify
  console.log('🌐 Desplegando a Netlify...');
  const netlifyCommand = `npx netlify deploy --prod --dir=${outDir}`;
  execSync(netlifyCommand, { stdio: 'inherit' });

  console.log('✅ Deploy completado exitosamente!');
  console.log('🔗 Tu aplicación está disponible en: https://odontoflash.netlify.app');

} catch (error) {
  console.error('❌ Error durante el deploy:', error.message);
  process.exit(1);
}
