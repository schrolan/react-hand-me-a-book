const Container = props => {
    return (
        <div className={`constiner ${props.className} || ''}`}>
            {props.children}
        </div>
    )
}

export default Container