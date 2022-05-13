

const posts = fetch("https://jsonplaceholder.typicode.com/posts").then((response) => {
    return response.json();
}).then(data => { return data }).catch((error) => { console.log(error) });


const comments = fetch("https://jsonplaceholder.typicode.com/comments").then((response) => {
    return response.json();
}).catch((error) => {
    console.log(error)
});

let loading = document.querySelector('.lds-circle')

Promise.all([posts, comments]).then((data) => {
    loading.style.display = 'none';
    const [fetchedPosts, fetchedComments] = data
    const table = document.querySelector('#postTable');
    const tbHead = table.querySelector("#postsTableHead");
    const tbBody = table.querySelector("#postsTableBody");

    const tableColumnHeaders = Object.keys(data[0][0]);

    let tbHeadTr = document.createElement("tr");
    for (let postPropertyItem of tableColumnHeaders) {
        let th = document.createElement("th");
        th.innerText = postPropertyItem;
        tbHeadTr.append(th)
    }
    tbHead.append(tbHeadTr)
    for (let fetchedPostsItem of fetchedPosts) {
        let tbBodyTr = document.createElement("tr");
        tbBodyTr.style.cursor = "pointer"
        for (let postItemKey in fetchedPostsItem) {
            const tbBodyTd = document.createElement('td');
            tbBodyTd.innerText = fetchedPostsItem[postItemKey];
            tbBodyTr.append(tbBodyTd)
        }
        let isOpen = false;
        tbBodyTr.addEventListener('click', (e) => {
            e.currentTarget.style.backgroundColor = ""

            if (!isOpen) {
                const postComments = fetchedComments.filter((item) => item.postId === fetchedPostsItem.id);
                const commentsTable = document.createElement('table');
                commentsTable.setAttribute("id", "commentsTable")
                commentsTable.setAttribute("class", "comment-table-class")
                commentsTable.style.backgroundColor = "#ebccc3"
                document.querySelector('#table-container-comment').append(commentsTable);
                const commentsTableHead = document.createElement('thead');
                const commentsTableHeadTr = document.createElement('tr');
                commentsTableHeadTr.innerHTML = "<th>Comments</th>";
                commentsTableHead.append(commentsTableHeadTr);
                const commentsTableBody = document.createElement('tbody');;
                for (let commentItem of postComments) {
                    const commentsTableBodyTr = document.createElement('tr');
                    commentsTableBodyTr.innerHTML = `<td>${commentItem.body}</td>`;
                    commentsTableBody.append(commentsTableBodyTr);
                }

                commentsTable.append(commentsTableHead)
                commentsTable.append(commentsTableBody);
            }
            if (isOpen) {
                document.querySelector('#commentsTable').remove()
            }
            isOpen = !isOpen
            if (isOpen) {
                e.currentTarget.style.backgroundColor = "#ebccc3"
            }
        })

        tbBody.append(tbBodyTr)
    }


});

