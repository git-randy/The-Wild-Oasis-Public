import Image from "next/image";
import { signInAction } from "~/app/_lib/actions";

function SignInButton() {
  // Use form action to execute function on server in place of onClick (used on
  // client components)
  return (
    <form action={signInAction}>
      <button
        className="flex items-center gap-6 text-lg border border-primary-300
      px-10 py-4 font-medium"
      >
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
