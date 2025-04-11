export default function ArticleLayout({ children }) {
    return (
      <div>
        {/* We no longer try to access article data here */}
        {children}
      </div>
    );
  }
  