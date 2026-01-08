import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Content = ({ parts }: { parts: CoursePart[] }) => {
  parts.forEach((part) => {
    switch (part.kind) {
      case "basic":
        console.log(part.name, part.description, part.exerciseCount);
        break;
      case "group":
        console.log(part.name, part.groupProjectCount, part.exerciseCount);
        break;
      case "background":
        console.log(
          part.backgroundMaterial,
          part.description,
          part.exerciseCount,
          part.kind,
          part.name
        );
        break;
      default:
        assertNever(part);
    }
  });
  return (
    <div>
      {parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
