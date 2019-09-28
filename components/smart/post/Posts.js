import React, { Component } from 'react';
import axios from 'axios';
import Router from 'next/router';
const querystring = require('querystring');

import fb from '../../../config/firebase';

import PostList from '../../dumb/post/PostList';
import PostFilter from '../../dumb/post/PostFilter';


class Posts extends Component {
    static defaultProps = {
        user: null,
        selectedLocation: {},
    }

    state = {
        user: null,
        depositor: '',
        willBeAppliedMatch: [],
        postList: [],
        selectedFilter: '전체', // default: 전체
        filterList: [
            // {
            //     name: '전체',
            //     desc: '모든 게시물입니다.',
            // },
            // {
            //     name: '상대팀 모집',
            //     desc: '축구/풋살 경기 중 상대팀이 필요한 게시물입니다.',
            // },
            // {
            //     name: '용병 대기',
            //     desc: '경기에 참여 할 수 있는 제 3자(개인 또는 단체)가 대기중인 게시물입니다.',
            // },
            // {
            //     name: '용병모집',
            //     desc: '경기에 참여 할 수 있는 제 3자(개인 또는 단체)를 모집하는 게시물입니다.',
            // },
            // {
            //     name: '팀원 모집',
            //     desc: '새로운 팀원을 모집하는 게시글입니다.',
            // },
            // {
            //     name: '팀 입단 원함',
            //     desc: '팀에 새로 가입하고 싶은 사람들의 게시물입니다.',
            // },
        ],
        renderFilterList: [],
    }

    componentDidMount() {
        const { selectedLocation } = this.props;
        console.log('Posts에서 componentDidMount 실행');
    }

    handleFilter = (e) => {
        this.setState({
            selectedFilter: e.target.value,
        });
    }

    renderFilter = (postFilterList) => {
        this.setState({
            renderFilterList: postFilterList,
        });
    }

    renderPosts = (postList) => {
        console.log('Posts에서 renderPosts 실행');

        this.setState({
            postList,
        });
    }

    getState = () => {
        return this.state;
    }
    
    render() {
        console.log('Posts에서 render() 실행');
        const { postList, filterList, selectedFilter, renderFilterList } = this.state;
        const { url, selectedLocation } = this.props;
        console.log('url in postjs', url);
        console.log('this props in Post js', this.props);

        return (
            <div className="posts-container">
                <style jsx>{`
                    .posts-container {
                        width: 100%;
                        max-width: 720px;
                    }
                    .title {

                    }
                    .sub-title{
                        font-size: 1rem;
                    }
                `}</style>
                <h2 className="title">경기</h2>
                <p
                    className="sub-title"
                    name='mainTitle'
                >
                    {url.query.sigungu ? url.query.location + ' ' : url.query.location}{url.query.sigungu}
                </p>
                <div className="posts-sub-container">
                    <PostFilter
                        handleFilter={this.handleFilter}
                        renderFilter={this.renderFilter}
                        filterList={filterList}
                        selectedFilter={selectedFilter}
                        renderFilterList={renderFilterList}
                    />
                    <PostList
                        renderPosts={this.renderPosts}
                        applyMatch={this.applyMatch}
                        user={this.props.user}
                        posts={this.props.posts}
                        postList={postList}
                        selectedFilter={selectedFilter}
                        depositor={this.props.depositor}
                    />
                 </div>
                { // 나중에 지역 세분화 할 때 사용
                    // url.query.location === '세종특별자치시'
                    // && <div className="posts-sub-container">
                    // <PostFilter
                    //     handleFilter={this.handleFilter}
                    //     renderFilter={this.renderFilter}
                    //     filterList={filterList}
                    //     selectedFilter={selectedFilter}
                    //     renderFilterList={renderFilterList}
                    // />
                    // <PostList
                    //     renderPosts={this.renderPosts}
                    //     applyMatch={this.applyMatch}
                    //     user={this.props.user}
                    //     posts={this.props.posts}
                    //     postList={postList}
                    //     selectedFilter={selectedFilter}
                    //     depositor={this.props.depositor}
                    // />
                    // </div>
                }
                { // 나중에 지역 세분화 할 때 사용
                //    (url.query.sigungu && url.query.location !== '세종특별자치시')
                //     ? <div className="posts-sub-container">
                //         <PostFilter
                //             handleFilter={this.handleFilter}
                //             renderFilter={this.renderFilter}
                //             filterList={filterList}
                //             selectedFilter={selectedFilter}
                //             renderFilterList={renderFilterList}
                //         />
                //         <PostList
                //             renderPosts={this.renderPosts}
                //             applyMatch={this.applyMatch}
                //             user={this.props.user}
                //             posts={this.props.posts}
                //             postList={postList}
                //             selectedFilter={selectedFilter}
                //             depositor={this.props.depositor}
                //         />
                //         </div>
                //     : '하위 지역을 선택하세요.'         
                }

            </div>
        );
    }
}

export default Posts;