
const commonModels = () => {
  return [
    import('./models/user/user.js'),
    import('./models/goods/goods.js'),
  ];
};

export default [
  {
    path: '/',
    models: () => [
      ...commonModels()],
    page: () => import('./routes/main/MainContainer.jsx'),
  },
  {
    path: '/regist',
    models: () => [
      ...commonModels()],
    page: () => import('./routes/regist/RegistContainer.jsx'),
  },
  {
    path: '/login',
    models: () => [
      ...commonModels()],
    page: () => import('./routes/login/LoginContainer.jsx'),
  },
  {
    path: '/find',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/goods/FindContainer.jsx'),
  },
  {
    path: '/receive',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/goods/ReceiveContainer.jsx'),
  },
  {
    path: '/detail/:id',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/goods/DetailContainer.jsx'),
  },
  {
    path: '/release',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/goods/ReleaseContainer.jsx'),
  },
];
