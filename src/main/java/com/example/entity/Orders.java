package com.example.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @author liuhuan
 */
@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
public class Orders {
    /** 主键 */
    private Integer id;

    /** 订单编号 */
    private String orderNum;

    /** 订单总价 */
    private Double orderMoney;

    /** 订单备注 */
    private String remark;

    /** 0未结算，1已结算 */
    private String orderStatus;

    /** 入住信息主键 */
    private Integer iriId;

    /** 下单时间 */
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:MM:ss")
    @JsonFormat(pattern = "yyyy-MM-dd hh:MM:ss",timezone = "GMT+8")
    private Date createDate;

    /** 1显示，0隐藏 */
    private String flag;

    /** 退房时的客人信息时间等等 */
    private String orderOther;

    /** 退房时的各种金额 */
    private String orderPrice;

    /** 入住信息实体类 对象 */
    private  InRoomInfo inRoomInfo;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(String orderNum) {
        this.orderNum = orderNum == null ? null : orderNum.trim();
    }

    public Double getOrderMoney() {
        return orderMoney;
    }

    public void setOrderMoney(Double orderMoney) {
        this.orderMoney = orderMoney;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus == null ? null : orderStatus.trim();
    }

    public Integer getIriId() {
        return iriId;
    }

    public void setIriId(Integer iriId) {
        this.iriId = iriId;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag == null ? null : flag.trim();
    }

    public String getOrderOther() {
        return orderOther;
    }

    public void setOrderOther(String orderOther) {
        this.orderOther = orderOther == null ? null : orderOther.trim();
    }

    public String getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(String orderPrice) {
        this.orderPrice = orderPrice == null ? null : orderPrice.trim();
    }

    public InRoomInfo getInRoomInfo() {
        return inRoomInfo;
    }

    public void setInRoomInfo(InRoomInfo inRoomInfo) {
        this.inRoomInfo = inRoomInfo;
    }

    @Override
    public String toString() {
        return "Orders{" +
                "id=" + id +
                ", orderNum='" + orderNum + '\'' +
                ", orderMoney=" + orderMoney +
                ", remark='" + remark + '\'' +
                ", orderStatus='" + orderStatus + '\'' +
                ", iriId=" + iriId +
                ", createDate=" + createDate +
                ", flag='" + flag + '\'' +
                ", orderOther='" + orderOther + '\'' +
                ", orderPrice='" + orderPrice + '\'' +
                ", inRoomInfo=" + inRoomInfo +
                '}';
    }
}