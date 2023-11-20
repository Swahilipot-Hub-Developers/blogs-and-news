import Link from 'next/link';

const SidePane = ({username}) => {
  return (
    <div className='sideNav'>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard/[username]" as={`/dashboard/${username}`}>
              <a>Create Profile</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/create-article">
              <a>Create Article</a>
            </Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};

export default SidePane;
