function Container() {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <div className={"Box"}>
                <Title text={"Hello World!"} width={200} />
                <button onClick{() => {}}>좋아요</button>
                <a href={"/home"} style={{marginTop: '10px', color:'red'}}>홈으로 이동</a>
            </div>
        </div>
    );
}

ReactDOM.render(React.createElement(Container), document.querySelector('#react-root'));
