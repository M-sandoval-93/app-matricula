import CourseCard from "./CourseCard";

const ListCourse = () => {
  return (
    <section className="w-full flex-wrap relative flex justify-start mt-2 gap-3">
      <CourseCard grade={"1"} letter={"A"} />
      <CourseCard grade={"1"} letter={"B"} />
      <CourseCard grade={"1"} letter={"C"} />
      <CourseCard grade={"1"} letter={"D"} />
      <CourseCard grade={"1"} letter={"E"} />
      <CourseCard grade={"1"} letter={"F"} />
      <CourseCard grade={"1"} letter={"G"} />
      <CourseCard grade={"1"} letter={"H"} />
      <CourseCard grade={"1"} letter={"J"} />
      <CourseCard grade={"1"} letter={"J"} />
      <CourseCard grade={"1"} letter={"K"} />
    </section>
  );
};

export default ListCourse;
