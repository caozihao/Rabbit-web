
const commonModels = () => {
  return [
    import('./models/user/user.js'),
    import('./models/post/post.js'),
    import('./models/comment/comment.js'),
    import('./models/common/common.js'),
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
    path: '/search',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/post/SearchAndReceiveContainer.jsx'),
  },
  {
    path: '/receive',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/post/SearchAndReceiveContainer.jsx'),
  },
  {
    path: '/detail/:id',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/post/DetailContainer.jsx'),
  },
  {
    path: '/release',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/post/ReleaseContainer.jsx'),
  },
  {
    path: '/about_us',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/static/StaticContainer.jsx'),
  },
  {
    path: '/help',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/static/StaticContainer.jsx'),
  },
  {
    path: '/back',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/backLogin/BackLoginContainer.jsx'),
  },
  {
    path: '/back/login',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/backLogin/BackLoginContainer.jsx'),
  },
  {
    path: '/back/user',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/backUser/BackUserContainer.jsx'),
  },
  {
    path: '/back/post',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/backPost/BackPostContainer.jsx'),
  },
    {
    path: '/back/comment',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/backComment/BackCommentContainer.jsx'),
  },
  {
    path: '/back/comment/:postId',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/backComment/BackCommentContainer.jsx'),
  },
];
