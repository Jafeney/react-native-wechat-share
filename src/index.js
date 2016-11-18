/**
 * @desc 分享遮罩
 * @author Jafeney
 * @datetime 2016-09-23
 **/

import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Text, PixelRatio, Dimensions } from 'react-native'

import ModalBox from 'react-native-modalbox'
import * as WeChat from 'react-native-wechat'

const Window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

const shareList = [
    {
        icon: require('./icon-weixin.png'),
        name: '微信好友',
        code: 'wx_friend',
    },
    {
        icon: require('./icon-circle.png'),
        name: '朋友圈',
        code: 'wx_circle',
    }
];

export default class ShareModal extends Component {

    constructor(props) {
        super(props)
        this.lock = false  // 防止重复提交
        this.shareData = {
            thumbImage: props.thumbImage || 'http://xiangke.da56.com/static/img/xiangke.png',
            title: props.title || '享客 - 享你所想',
            webpageUrl: props.webpageUrl || 'http://xiangke.da56.com/static/',
        }
    }

    handleTodo(code) {
        if (!this.lock) {
            switch (code) {
                case 'wx_circle':
                    this.handleShareWeixinCircle(this.shareData)
                    break;
                case 'wx_friend':
                    this.handleShareWeixinFriend(this.shareData)
                    break;
                default:
                    break;
            }
        }
    }

    async handleShareWeixinCircle(opt) {
        this.lock = true
        try {
            let result = await WeChat.shareToTimeline({
                type: "news",
                ...opt,
            });
        } catch (e) {
            console.error(e)
        } finally {
            this.lock = false
            this.close()
        }
    }

    async handleShareWeixinFriend(opt) {
        this.lock = true
        try {
            let result = await WeChat.shareToSession({
                type: "news",
                ...opt,
            });
        } catch (e) {
            console.error(e)
        } finally {
            this.lock = false
            this.close()
        }
    }

    _renderList(data) {
        return data.map((item, i) => {
            return (
                <TouchableOpacity key={i} onPress={()=>this.handleTodo(item.code)} style={styles.item}>
                    <Image style={styles.image} source={item.icon} />
                    <Text style={styles.title}>{item.name}</Text>
                </TouchableOpacity>
            )
        })
    }

    open() {
        this.refs.modal.open()
    }

    close() {
        this.refs.modal.close()
    }

    render() {
        return (
            <ModalBox
                ref={"modal"}
                style={[styles.modal,
                    {width: Window.width, height: Math.ceil(shareList.length/3)*100 + 70}]}
                backdropOpacity={0.3}
                position={"bottom"}
                isOpen={false}>
                <View style={styles.content}>
                    { this._renderList(shareList) }
                </View>
                <TouchableOpacity
                    onPress={()=>this.close()} style={styles.btn}>
                    <Text style={styles.btnText}>取消</Text>
                </TouchableOpacity>
            </ModalBox>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 20,
        paddingRight: 20,
        position: 'relative',
    },
    item: {
        width: (Window.width - 40) / 3,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        marginBottom: 10,
    },
    title: {
        fontSize: 14,
        color: '#9B9B9B',
    },
    btn: {
        borderTopColor: '#eee',
        borderTopWidth: 1/PixelRatio.get(),
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 16,
        color: '#686868',
    },
});
