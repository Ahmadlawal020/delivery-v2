import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshTokenMutation } from "./api/authApiSlice";
import usePersist from "../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [
    refreshToken,
    { isUninitialized, isLoading, isSuccess, isError, error },
  ] = useRefreshTokenMutation();

  useEffect(() => {
    if (
      effectRan.current === true ||
      import.meta.env.NODE_ENV !== "development"
    ) {
      //  my react version  "react": "^19.0.0",

      const verifyRefreshToken = async () => {
        // console.log("verifying refresh token");
        try {
          //const response =
          await refreshToken();
          //const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // persist: no
    // console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    // console.log("loading");
    content = <h1>loading...</h1>;
  } else if (isError) {
    //persist: yes, token: no
    // console.log("error");
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <div>
          <Link to="/auth">Please login again</Link>.
        </div>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    // console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    // console.log("token and uninit");
    // console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
