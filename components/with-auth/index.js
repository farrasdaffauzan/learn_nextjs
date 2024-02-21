export function withAuth(Component) {
  return function withAuth(props) {
    const isLogin = false;

    if (!isLogin) return <div> Anda Harus Login </div>;

    return <Component {...props} />;
  };
}
