function Sidebar() {
  return (
    <div className="h-full bg-gray-100 p-4">
      <ul className="flex flex-col gap-4">
        <li className="cursor-pointer font-medium hover:text-sky-600">
          Dashboard
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;