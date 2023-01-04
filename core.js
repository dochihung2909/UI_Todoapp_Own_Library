export default function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift())
        ,[first]
    )
    .filter(x => x && x !== true || x === 0)
    .join('')
}

export function createStore(reducer) {
    // Nhân dữ liêu từ reducer ban đầu
    let state = reducer()
    const roots = new Map() 

    function render() {
        for (const [root, component] of roots) {
            // Lấy ra DOM element (root) và component để render ra views
            const output = component()
            root.innerHTML = output   
        }
    } 

    return {
        attach(component, root) {
            roots.set(root, component)
            render()
        },
        // Lấy giá trj từ state truyền cho hàm selector
        connect(selector = state => state) {
            // Progs là các công cu dữ liêu muốn truyền vào component
            // Args la tất cả tham só còn la của component
            return component => (progs, ...args) => 
                component(Object.assign({}, progs, selector(state), ...args))
        },
        dispatch(action, ...args) {
            state = reducer(state, action, args)
            render()
        }
    }
}