export const updateObjectInArray=(items, itemsId, objectPropsName, newObjectProps)=>{
   items.map(u => {
        if (u[objectPropsName] === itemsId) {
            return { ...u, ...newObjectProps }
        }
        return u;
    })
}