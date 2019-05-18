package com.openhack.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Address class used to embedded into other classes
 *
 */
@Embeddable
@XmlRootElement
public class Address {

    @Column(name = "street")
    private String street; // e.g., 100 Main ST

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "zip")
    private String zip;

    /**
     * Constructor to initialize address
     */
    public Address(){

    }

    /**
     * Constructor to initialize address
     * @param street
     * @param city
     * @param state
     * @param zip
     */
    public Address(String street,
                   String city,
                   String state,
                   String zip){

        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;

    }

    /**
     * Get city from address
     * @return
     */
    public String getCity() {
        return city;
    }

    /**
     * Get state from address
     * @return
     */
    public String getState() {
        return state;
    }

    /**
     * Get street from address
     * @return
     */
    public String getStreet() {
        return street;
    }

    /**
     * Get street from address
     * @param street
     */
    @XmlElement
    public void setStreet(String street) {
        this.street = street;
    }

    /**
     * Set city value for address
     * @param city
     */
    @XmlElement
    public void setCity(String city) {
        this.city = city;
    }

    /**
     * Set state value for address
     * @param state
     */
    @XmlElement
    public void setState(String state) {
        this.state = state;
    }

    /**
     * Set Zip value for address
     * @param zip
     */
    @XmlElement
    public void setZip(String zip) {
        this.zip = zip;
    }

    /**
     * Get Zip value for address
     * @return
     */
    public String getZip() {
        return zip;
    }
}
