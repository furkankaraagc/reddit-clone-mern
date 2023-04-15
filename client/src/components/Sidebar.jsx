import { useState } from "react";

export const SideBar = () => {
  const categories = [
    {
      name: "turkey",
      children: [
        {
          name: "ankara",
          children: [
            {
              name: "Cankaya",
            },
          ],
        },
      ],
    },
    {
      name: "france",
      children: [
        {
          name: "paris",
        },
      ],
    },
  ];

  const Category = ({ category, level }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggle = () => {
      setIsExpanded(!isExpanded);
    };
    return (
      <div className='hidden lg:block '>
        {category.children && category.children.length > 0 ? (
          <button onClick={toggle} style={{ marginLeft: `${level * 10}px` }}>
            {isExpanded ? "-" : "+"} {category.name}
          </button>
        ) : (
          <span style={{ marginLeft: `${level * 10}px` }}>{category.name}</span>
        )}

        {isExpanded && (
          <div>
            {category.children?.map((child) => (
              <Category category={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {categories.map((category) => (
        <Category category={category} level={1} />
      ))}
    </div>
  );
};
