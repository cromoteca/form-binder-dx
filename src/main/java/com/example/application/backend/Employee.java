package com.example.application.backend;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class Employee {
    private static long id_tracker = 42L; 

    private Long id;
    private String firstname;
    private String lastname;
    private String title;
    private String email;
    private String notes = "";
    private int age = 25;

    public Employee(String firstname, String lastname, String email, String title) {
        super();
        this.id = id_tracker++;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.title = title;
    }

    public Employee() {

    }

    @NotBlank(message = "First name is mandatory")
    @Size(max = 10, message = "First name cannot be longer than 10 characters")
    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    @NotBlank(message = "Last name is mandatory")
    @Size(max = 10, message = "Last name cannot be longer than 10 characters")
    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @NotBlank(message = "Email is mandatory")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return firstname + " " + lastname + "(" + email + ")";
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public int hashCode() {
        if (id == null) {
            return super.hashCode();
        } else {
            return id.intValue();
        }
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null || id == null) {
            return false;
        }
        if (!(obj instanceof Employee)) {
            return false;
        }

        if (id.equals(((Employee) obj).id)) {
            return true;
        }
        return false;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
