import React from 'react';

const FollowingList = ({ header, data }) => {
    return (
        <div>
            {header}<br />
            <div>
                {data.map( item => {
                    // console.log('item: ', item)
                    return (
                        <li>
                             id: {item.id}<br />
                            nickname: {item.nickname}<br />
                            <button>삭제</button>
                        </li>
                    )
                })}
            </div>
            <div>더보기</div>
        </div>
    );
};

export default FollowingList;