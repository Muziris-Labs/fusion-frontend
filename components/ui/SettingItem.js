export default function SettingItem({
  children,
  title,
  description,
  icon,
  isLast = false,
}) {
  return (
    <div className="w-full flex gap-5 flex-col sm:flex-row">
      {icon}

      <div
        className="flex-1 border border-black/10 dark:border-white/10 dark:text-white border-t-0 border-x-0 pb-10"
        style={{
          borderBottomWidth: isLast ? "0px" : "1px",
        }}
      >
        <div className="flex flex-col md:flex-row justify-between w-full items-start md:items-center gap-8 md:gap-0">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg">{title}</h2>
            <p className="font-light text-gray-600 text-sm w-80">
              {description}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
