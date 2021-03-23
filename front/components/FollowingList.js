import React from 'react';

const FollowingList = ({ header, data }) => {
    return (
        <div>
            {header}<br />
            <div>
                {data.map( item => {
                    return (
                        <li>{item.nick}<br /><button>삭제</button></li>
                    )
                })}
            </div>
            <div>더보기</div>
        </div>
    );
};

export default FollowingList;