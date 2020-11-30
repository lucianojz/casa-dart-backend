module.exports = {
  presets: [
    [
      '@babel/preset-env', // responsável por converter o código para uma versão compatível com a versão atual do Node na máquina
      { targets: { node: 'current' } },
    ],
    '@babel/preset-typescript', // responsável por converter o código TS (se necessário) para JS
  ],

  plugins: [
    [
      'module-resolver', // Esta config é para caso você esteja utilizando os TypeScript Paths
      {
        alias: {
          '@modules': './src/modules', // Para cada path em seu 'tsconfig.json' uma chave aqui
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata', // Esses 3 plugins são responsáveis por converter os decorators presente no TypeORM
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
