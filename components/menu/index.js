import Link from "next/link";

export default function () {
  return (
    <div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Proile</Link>
        </li>
        <li>
          <Link href="/users">Users</Link>
        </li>
        <li>
          <Link href="/notes">Notes</Link>
        </li>
        <br></br>
      </ul>
    </div>
  );
}
