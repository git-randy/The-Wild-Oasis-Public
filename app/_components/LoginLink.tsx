import Link from "next/link"

function LoginLink({text = "Log In"}: {text: string}) {
  return (
    <Link
      className="text-primary-700"
      href={"/api/auth/signin"}
    >
        {text}
    </Link>
  )
}

export default LoginLink