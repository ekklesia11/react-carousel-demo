import React from 'react';
import styled from 'styled-components'

function App() {
  const [reviewIndex, setReviewIndex] = React.useState(0);
  const [flag, setFlag] = React.useState(true);
  const reviews = [
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
  ];

  const setStyle = (nav) => {
    let classes = document.getElementsByClassName("each-review");
    for (let i = 0; i < classes.length - 1; i++) {
      let x = window.getComputedStyle(classes[i]).getPropertyValue("transform").split(",")[4] || 0;

      let newX = nav === "next" ? Number(x) - 250 : Number(x) + 250;
      classes[i].style.transform = `translateX(${newX}px)`;
    }
  }

  const handleReviewMove = (e) => {
    let parent = document.getElementById("review-carousel");
    let child = document.createElement("div");
    let review = document.getElementsByClassName("each-review");
    child.className = "each-review";

    const reviewStyle = `
      border: 2px solid blue;
      padding: 50px;
      transition: transform 0.4s ease-out;
      display: inline-block;
      position: absolute;
      left: ${e.target.id === "prev" ? 20 : 80}%;
    `;

    if (e.target.id === "prev") {
      setReviewIndex(prev => prev - 1);
      child.setAttribute("style", reviewStyle);
      let index = reviewIndex <= 0 ? 5 - (Math.abs(reviewIndex) % 6) : Math.abs(5 + reviewIndex) % 6;
      child.innerHTML = reviews[index].title;
      setStyle("prev");
      parent.insertBefore(child, review[0]);
      review[5].remove();
    } else if (e.target.id === "next") {
      setReviewIndex(prev => prev + 1);
      child.setAttribute("style", reviewStyle);
      let index = reviewIndex < 0 ? 5 - (Math.abs(reviewIndex) % 6) : Math.abs(5 + reviewIndex) % 6;
      child.innerHTML = reviews[index].title;
      parent.append(child);
      setStyle("next");
      review[0].remove();
    }

    setTimeout(() => {
      setFlag(true);
    }, 500)
  }

  return (
    <div>
      <Container id="review-carousel">
        <Review id="r0" className="each-review" style={{ transition: `transform 0.4s ease-out` }}>{reviews[0].title}</Review>
        <Review id="r1" className="each-review" style={{ transition: `transform 0.4s ease-out` }}>{reviews[1].title}</Review>
        <Review id="r2" className="each-review" style={{ transition: `transform 0.4s ease-out` }}>{reviews[2].title}</Review>
        <Review id="r3" className="each-review" style={{ transition: `transform 0.4s ease-out` }}>{reviews[3].title}</Review>
        <Review id="r4" className="each-review" style={{ transition: `transform 0.4s ease-out` }}>{reviews[4].title}</Review>
      </Container>
      <ButtonGroup>
        <button id="prev" onClick={(e) => {
          if (flag) {
            setFlag(false);
            handleReviewMove(e);
          }
        }}>left</button>
        <button id="next" onClick={(e) => {
          if (flag) {
            setFlag(false);
            handleReviewMove(e);
          }
        }}>right</button>
      </ButtonGroup>
    </div >
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: relative;
  top: 200px;
`;

const Review = styled.div`
  border: 2px solid blue;
  padding: 50px;
  display: inline-block;
  position: absolute;
`;

export default App;
