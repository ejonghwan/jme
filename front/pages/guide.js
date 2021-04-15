import React from 'react'
import s from './guild.module.css'
import SerchButton from '../components/smallPieces/button/SerchButton'
import DefaultButton from '../components/smallPieces/button/DefaultButton'
import TextButton from '../components/smallPieces/button/TextButton'

const guide = () => {


    return (
        <div style={{padding: "40px;"}}>
            <div>
            <h2 style={{fontSize: "20px", background: "#f9f9f"}}>### button</h2>
            <div className={s.item}>
                <h3>1. 검색버튼</h3>
                <ul className={s.list1}>
                    <li>component name : {"<SerchButton type={} value={} /> "}</li>
                    <li>options : type: 버튼타입, value: 히든되는 텍스트</li> 
                </ul>
                <ul className={s.list2}>
                    <li>type={"{type1}"} : <SerchButton type={"type1"} value={'정보 검색'}/></li>
                    <li>type={"{type2}"} : <SerchButton type={"type2"} value={'지도 검색'}/></li>
                </ul>
            </div>

            <div className={s.item}>
                <h3>2. 기본버튼</h3>
                <ul className={s.list1}>
                    <li>component name : {"<DefaultButton type={} value={} /> "}</li>
                    <li>options : type: 버튼타입, value: 히든되는 텍스트</li> 
                </ul>
                <ul className={s.list2}>
                    <li>type={"{type1}"} : <DefaultButton type={"type1"} value={'type1'}/></li>
                    <li>type={"{type2}"} : <DefaultButton type={"type2"} value={'type2'}/></li>
                    <li>type={"{type3}"} : <DefaultButton type={"type3"} value={'type3'}/></li>
                    <li>type={"{type4}"} : <DefaultButton type={"type4"} value={'type4'}/></li>
                </ul>
            </div>

            <div className={s.item}>
                <h3>3. 텍스트 버튼</h3>
                <ul className={s.list1}>
                    <li>component name : {"<DefaultButton type={} value={} /> "}</li>
                    <li>options : type: 버튼타입, value: 히든되는 텍스트</li> 
                </ul>
                <ul className={s.list2}>
                    <li>type={"{type1}"} : <TextButton type={"type1"} value={'type1'}/></li>
                    <li>type={"{type2}"} : <TextButton type={"type2"} value={'type2'}/></li>
                    <li>type={"{type3}"} : <TextButton type={"type3"} value={'type3'}/></li>
                    <li>type={"{type4}"} : <TextButton type={"type4"} value={'type4'}/></li>
                </ul>
            </div>
              
            </div>
        </div>
    )
}

export default guide;