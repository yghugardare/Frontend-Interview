import { Blog } from "../../types/blog";

type LeftPanelProps = {
  blogs: Blog[];
  selectedBlogId: number | null;
  onSelectBlog: (id: number) => void;
};

const LeftPanel = ({ blogs, selectedBlogId, onSelectBlog }: LeftPanelProps) => {
  return (
    <div
      style={{
        width: "320px",
        height: "100vh",
        borderRight: "1px solid #e5e7eb",
        padding: "16px",
        overflowY: "auto",
      }}
    >
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>
        Blog List
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {blogs.map((blog) => {
          const isActive = blog.id === selectedBlogId;

          return (
            <button
              key={blog.id}
              onClick={() => onSelectBlog(blog.id)}
              style={{
                textAlign: "left",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                backgroundColor: isActive ? "#111827" : "#ffffff",
                color: isActive ? "#ffffff" : "#111827",
                cursor: "pointer",
                fontWeight: 500,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                }
              }}
            >
              {blog.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LeftPanel;
