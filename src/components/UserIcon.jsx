const UserIcon = ({ size, email }) => {
  return (
    <div
      className={`flex flex-none justify-center items-center bg-purple-300 rounded-full`}
      style={{
        width: `${Number(size) / 4}rem`,
        height: `${Number(size) / 4}rem`,
      }}
    >
      {email[0].toUpperCase()}
    </div>
  );
};

export default UserIcon;
