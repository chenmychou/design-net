var data = [
  {id: 1, name: '0-0', replyid: 0},
  {id: 2, name: '0-1', replyid: 1},
  {id: 3, name: '0-2', replyid: 2},
  {id: 4, name: '0-2', replyid: 2},
  {id: 5, name: '0-3', replyid: 3},
  {id: 6, name: '0-3', replyid: 3},
  {id: 7, name: '0-3', replyid: 3},
  {id: 8, name: '0-4', replyid: 4},
]
  let result = { name: '0-0', id: 0 }
  let key = 'children'
  let relation='replyid'
  let ParentId='id'
  s(data)
  function s(arr) {
      arr.filter((o, i) => {
          if(!o[relation]){
              if (result[key] && result[key][0]) {
              } else {
                  result[key] = []
              }
              result[key].push(o)
          }else{
              if(result.children&&result.children[0]){
                  s1(result.children,o)
              }
          }
      })
  }   
  function s1(result,o) {
      for(let k in result){
          if(result[k][ParentId]==o[relation]){
              if(result[k].children&&result[k].children[0]){
                  result[k].children.push(o)
              }else{
                  result[k].children=[]
                  result[k].children.push(o)
              }
              break
          }else{
              if(result[k].children&&result[k].children[0]){
                  s1(result[k].children,o)
              }
          }
      }
  }
  console.log('result====>>>', result)
var data1 = [
  {
    id: 1,
    name: '0-0',
    replyid: 0,
    children: [
      {
        id: 2,
        name: '0-1',
        replyid: 1,
        children: [
          {
            id: 3,
            name: '0-2',
            replyid: 2,
            children: [
              {
                id: 5,
                name: '0-3',
                replyid: 3,
              },
              {
                id: 6,
                name: '0-3',
                replyid: 3,
              },
              {
                id: 7,
                name: '0-3',
                replyid: 3,
              }
            ]
          },
          {
            id: 4,
            name: '0-2',
            replyid: 2,
            children: [
              {
                id: 8,
                name: '0-4',
                replyid: 4,
              }
            ]
          }
        ]
      }
    ]
  }
]
// console.log('data', data)