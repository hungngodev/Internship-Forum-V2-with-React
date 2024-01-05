const Landing = () => {
    const test=[]
    for (let i = 0; i < 1000; i++) {
      test.push(<div key={i}>profile</div>)
    }
    return (
      <div>
       {test.map((item)=>item)}
      </div>
    );
  };
  
  export default Landing;
  