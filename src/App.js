import React from 'react';
import styled from 'styled-components'


function App() {
  const [reviewIndex, setReviewIndex] = React.useState(0);
  const [reviews, setReviews] = React.useState([
    {
      title: "review sample1"
    },
    {
      title: "review sample2"
    },
    {
      title: "review sample3"
    },
    {
      title: "review sample4"
    },
    {
      title: "review sample5"
    },
    {
      title: "review sample6"
    }
  ]);


  React.useEffect(() => {
    // if (typeof window !== "undefined") {
    //   const reviewStyle = `
    //     border: 2px solid blue;
    //     padding: 50px;
    //     margin: 15px;
    //     transition: transform 0.4s ease-out;
    //   `;

    //   let parent = document.getElementById("review-carousel");
    //   let child = document.createElement("div");
    //   child.setAttribute("style", reviewStyle);
    //   child.className = "each-review";
    //   child.innerHTML = reviews[(5 + reviewIndex) % 6].title;
    //   parent.append(child);
    // }
  }, [reviewIndex, reviews]);

  const setStyle = (nav) => {
    let classes = document.getElementsByClassName("each-review");
    for (let i = 0; i < classes.length - 1; i++) {
      console.log(classes[i].style.transform);
      if (nav === "next") {
        if (reviewIndex >= 0 ? Math.abs(reviewIndex) === 0 : Math.abs(reviewIndex) >= 3) {
          classes[i].style.transform = `translateX(-${250}px)`;
        } else if (reviewIndex >= 0 ? Math.abs(reviewIndex) === 1 : Math.abs(reviewIndex) === 2) {
          if (i === 4) {
            classes[i].style.transform = `translateX(-${250}px)`;
          } else {
            classes[i].style.transform = `translateX(-${2 * 250}px)`;
          }
        } else if (reviewIndex >= 0 ? Math.abs(reviewIndex) === 2 : Math.abs(reviewIndex) === 1) {
          if (i === 4) {
            classes[i].style.transform = `translateX(-${250}px)`;
          } else if (i === 3) {
            classes[i].style.transform = `translateX(-${2 * 250}px)`;
          } else {
            classes[i].style.transform = `translateX(-${3 * 250}px)`;
          }
        } else if (reviewIndex >= 0 ? Math.abs(reviewIndex) >= 3 : Math.abs(reviewIndex) === 0) {
          if (i === 4) {
            classes[i].style.transform = `translateX(-${250}px)`;
          } else if (i === 3) {
            classes[i].style.transform = `translateX(-${2 * 250}px)`;
          } else if (i === 2) {
            classes[i].style.transform = `translateX(-${3 * 250}px)`;
          } else if (i === 1) {
            classes[i].style.transform = `translateX(-${4 * 250}px)`;
          }
        }
      } else if (nav === "prev") {
        if (Math.abs(reviewIndex) === 0) {
          classes[i].style.transform = `translateX(${250}px)`;
        } else if (Math.abs(reviewIndex) === 1) {
          if (i === 0) {
            classes[i].style.transform = `translateX(${250}px)`;
          } else {
            classes[i].style.transform = `translateX(${2 * 250}px)`;
          }
        } else if (Math.abs(reviewIndex) === 2) {
          if (i === 0) {
            classes[i].style.transform = `translateX(${250}px)`;
          } else if (i === 1) {
            classes[i].style.transform = `translateX(${2 * 250}px)`;
          } else {
            classes[i].style.transform = `translateX(${3 * 250}px)`;
          }
        } else if (Math.abs(reviewIndex) >= 3) {
          if (reviewIndex <= 0) {
            if (i === 0) {
              classes[i].style.transform = `translateX(${250}px)`;
            } else if (i === 1) {
              classes[i].style.transform = `translateX(${2 * 250}px)`;
            } else if (i === 2) {
              classes[i].style.transform = `translateX(${3 * 250}px)`;
            } else if (i === 3) {
              classes[i].style.transform = `translateX(${4 * 250}px)`;
            }
          } else {
            let translated = Number(classes[i].style.transform.split("(")[1].split("p")[0]);
            classes[i].style.transform = `translateX(${translated + 250}px)`;
          }
        }
      }
    }
  }

  const handleReviewMove = (e) => {
    let parent = document.getElementById("review-carousel");
    let child = document.createElement("div");
    let review = document.getElementsByClassName("each-review");
    child.className = "each-review";

    if (e.target.id === "prev") {
      setReviewIndex(prev => prev - 1);
      const reviewStyle = `
        border: 2px solid blue;
        padding: 50px;
        margin: 15px;
        transition: transform 0.4s ease-out;
        display: inline-block;
        position: absolute;
        left: 20%;
      `;
      child.setAttribute("style", reviewStyle);
      if (reviewIndex <= 0) {
        child.innerHTML = reviews[5 - (Math.abs(reviewIndex) % 6)].title;
      } else {
        child.innerHTML = reviews[Math.abs((5 + reviewIndex)) % 6].title;
      }
      setStyle("prev");
      parent.insertBefore(child, review[0]);
      review[5].remove();
    } else if (e.target.id === "next") {
      setReviewIndex(prev => prev + 1);
      const reviewStyle = `
          border: 2px solid blue;
          padding: 50px;
          margin: 15px;
          transition: transform 0.4s ease-out;
          display: inline-block;
          position: absolute;
          left: 80%;
        `;
      child.setAttribute("style", reviewStyle);
      if (reviewIndex < 0) {
        child.innerHTML = reviews[5 - (Math.abs(reviewIndex) % 6)].title;
      } else {
        child.innerHTML = reviews[Math.abs((5 + reviewIndex)) % 6].title;
      }
      parent.append(child);
      setStyle("next");
      review[0].remove();
    }
  }

  return (
    <Masking>
      {reviewIndex}
      {
        reviewIndex < 0 ?
          "index = " + (Math.abs(reviewIndex + 6) % 6) :
          "index = " + (Math.abs(reviewIndex) % 6)
      }
      <MaskingBorder>
        <ButtonGroup>
          <button id="prev" onClick={handleReviewMove}>left</button>
          <button id="next" onClick={handleReviewMove}>right</button>
        </ButtonGroup>
      </MaskingBorder>
      <Container id="review-carousel">
        <Review id="r0" className="each-review" style={{ transition: `transform 0.4s ease-out` }}>{reviews[0].title}</Review>
        <Review id="r1" className="each-review" style={{ transition: `transform 0.4s ease-out` }}>{reviews[1].title}</Review>
        <Review id="r2" className="each-review" style={{ transition: `transform 0.4s ease-out` }}>{reviews[2].title}</Review>
        <Review id="r3" className="each-review" style={{ transition: `transform 0.4s ease-out` }}>{reviews[3].title}</Review>
        <Review id="r4" className="each-review" style={{ transition: `transform 0.4s ease-out` }}>{reviews[4].title}</Review>
      </Container>
    </Masking >
  );
}

const Container = styled.div`
  #r0 {
    left: 20%;
  }
  #r1 {
    left: 35%;
  }
  #r2 {
    left: 50%;
  }
  #r3 {
    left: 65%;
  }
  #r4 {
    left: 80%;
  }
`;

const Masking = styled.div`
`;

const MaskingBorder = styled.div`
  border: 1px solid red;
  width: 500px;
  height: 200px;
  margin: 0 auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Review = styled.div`
  border: 2px solid blue;
  padding: 50px;
  margin: 15px;
  display: inline-block;
  position: absolute;
`;

export default App;
