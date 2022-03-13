import React from 'react';

// ini contoh pembuatan komponen scroll,..dimana komponen scrool adalah komponen dengan tag penutup <Scrool></Scrool> (biasanya komponen itu self close tag kek <Cardlist />)
const Scroll = (props) => {
    //* props ini parameter const scroll,..yang mengacu pada property komponen scroll nantinya di app.js
    // tapi karena komponen Scroll ini mempunyai penutup jadinya props ini akan mengacu kepada anaknya yaitu semua yang berada didalam <Scrool> (ini anaknya) </Scrool>
    // penjelasan soal property atau props lebih lengkap dibawah ada
    return (
        <div style={{ overflow: 'scroll', overflowX: 'hidden', border: 'none', height: '300px' }}>
            {' '}
            {/**penulisan css pada jsx secara inline yaitu style {{}} */}
            {props.children}{' '}
            {/* children ini maksudnya adalah komponen yang berada didalam komponen,...lebih lengkapnya dibawah ada penjelasannya */}
        </div>
    );
};

//* props ini seperti yang ud dijelaskan bahwa bahsa kasarnya props ini itu property dari scroll tapi berkedok parameter scroll
// artinya scroll memang mempunyai property benrana props,..tapi karena ini itu termasuk fungsional komponen maka propsertynya dimasukin ke tempat parameter atau tulisan props itu berada di tempat parameter
// meskipun props nya ada ditempat parameter,...tapi tetap fungsinya sebagai sebagai property komponen ada,..

//* children ini maksudnya itu komponen yang ada didalam komponen,..dalam kasus ini itu <CardList /> berada di dalam komponen Scroll
// <Scroll>
//    <CardList />  ----------> nah maksud gw ini itu anak atau childrennya,..jadi semua yg ada didalem Scrool itu anaknya scroll
// </Scroll>
export default Scroll;
