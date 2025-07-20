import Link from "next/link";

function LoginMessage() {
  return (
    <div className='grid bg-primary-800 '>
      <p className='text-center text-xl py-12 self-center'>
        <Link href='/login' className='underline text-accent-500'>
          Log in
        </Link>{' '}
        to reserve this
        <br /> cabin
      </p>
    </div>
  );
}

export default LoginMessage;
