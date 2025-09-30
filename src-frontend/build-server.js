#!/usr/bin/env bun

console.log('Building production server without socket.io dependencies...');

// Create a simplified production server that compiles easily
const compileResult = await Bun.build({
  entrypoints: ['./src/server-production.tsx'],
  compile: true,
  outfile: './app',
  target: 'bun',
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});

if (!compileResult.success) {
  console.error('Compile failed:', compileResult.logs);
  console.error('Full result:', compileResult);

  // Fallback: create bundled version
  console.log('Falling back to bundled version...');
  const bundleResult = await Bun.build({
    entrypoints: ['./src/server-production.tsx'],
    outfile: './app.js',
    target: 'bun',
    format: 'esm',
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  });

  if (bundleResult.success) {
    console.log('✅ Created bundled server at ./app.js');
    console.log('   Run with: bun app.js');
  } else {
    console.error('Both compile and bundle failed:', bundleResult.logs);
    process.exit(1);
  }
} else {
  console.log('✅ Server compiled successfully to ./app');
  console.log('   Run with: ./app');
}

console.log('\nNote: This production build serves static files only (no WebSocket/Socket.IO).');
console.log('For full functionality including WebSocket, run: NODE_ENV=production bun src/index.tsx');