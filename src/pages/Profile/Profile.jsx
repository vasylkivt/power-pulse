import TitlePage from 'components/common/TitlePage/TitlePage';
import UserCard from 'components/profile/UserCard/UserCard';
import UserForm from 'components/profile/UserForm/UserForm';

export default function Profile() {
  return (
    <>
      {/* <div>Profile page</div> */}
      <TitlePage text="Profile Settings" />
      <UserCard />
      <UserForm />
    </>
  );
}
