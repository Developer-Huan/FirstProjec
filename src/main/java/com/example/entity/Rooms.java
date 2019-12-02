package com.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author liuhuan
 */
@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
public class Rooms {
    /** 主键 */
    private Integer id;

    /** 房屋封面图 */
    private String roomPic;

    /** 房间编号 */
    private String roomNum;

    /** 房间的状态(0空闲，1已入住，2打扫) */
    private String roomStatus;

    /** 房间类型主键 */
    private Integer roomTypeId;

    private RoomType roomType;

    /** 是否显示该条房屋信息 1显示  0不显示 */
    private String flag;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoomPic() {
        return roomPic;
    }

    public void setRoomPic(String roomPic) {
        this.roomPic = roomPic == null ? null : roomPic.trim();
    }

    public String getRoomNum() {
        return roomNum;
    }

    public void setRoomNum(String roomNum) {
        this.roomNum = roomNum == null ? null : roomNum.trim();
    }

    public String getRoomStatus() {
        return roomStatus;
    }

    public void setRoomStatus(String roomStatus) {
        this.roomStatus = roomStatus == null ? null : roomStatus.trim();
    }

    public Integer getRoomTypeId() {
        return roomTypeId;
    }

    public void setRoomTypeId(Integer roomTypeId) {
        this.roomTypeId = roomTypeId;
    }

    public RoomType getRoomType() {
        return roomType;
    }

    public void setRoomType(RoomType roomType) {
        this.roomType = roomType;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }
}