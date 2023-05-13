
describe("Login Page",() => {
    beforeEach(() => {
        cy.visit("/login")
    })

    it("Login with valid credential",() => {
        cy.get("#email").type("automate@test.com")
        cy.get("#password").type("password")
        cy.get("#loginbtn").click({force:true}).then(() => {
            cy.get('.mat-mdc-snack-bar-label').should('be.visible')
            .and("contain","เข้าสู่ระบบสำเร็จ")
            cy.url().should('contain','home')
        })
    })

    it("Login with invalid credential",() => {
        cy.get("#email").type("automate@test.com")
        cy.get("#password").type("SSSSSSS")
        cy.get("#loginbtn").click({force:true}).then(() => {
            cy.get('.swal2-popup').should('be.visible')
            .and("contain","โปรดอีเมลและรหัสผ่านให้ถูกต้อง")
        })
    })

    it("Login with invalid email",() => {
        cy.get("#email").type("automate")
        cy.get("#password").type("password")
        cy.get('#mat-mdc-error-2').should('be.visible').and("contain","โปรดกรอกอีเมลที่ถูกต้อง")
    })

    it("Click register button to go to register page",() => {
        cy.get("#newregister").click({force:true}).then(() => {
            cy.url().should("contain","register")
        })
    })

    it("Click forgot password button to show popup",() => {
        cy.get("#forgetpw").click({force:true}).then(() => {
            cy.get('#swal2-title').should('be.visible').and("contain",'กรอกอีเมลที่ต้องการเปลี่ยนรหัสผ่าน')
                })
    })

})