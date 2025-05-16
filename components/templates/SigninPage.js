import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

function SigninPage({ session }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // const { status } = useSession();

  // useEffect(() => {
  //   if (status === "authenticated") router.replace("/");
  // }, [status]);

  const loginHandler = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res.error) router.push("/");
  };

  return (
    <div className="signin-form">
      <h3>Login Form</h3>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginHandler}>Login</button>
      <div>
        <p>Create an account?</p>
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default SigninPage;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        //موقت
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
