interface HighlightTextProps {
  text: string;
  highlight: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({ text, highlight }) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part)}</span>;
};
export default HighlightText;