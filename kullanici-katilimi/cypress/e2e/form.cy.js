describe('form sayafasi testleri', () => {
    beforeEach(() => {
      
      cy.visit('http://localhost:3000/')
    })
  
    it('Write something in name area', () => {
        cy.get("input[name=name]").type("aliveli")
        cy.get("input[name=name]").should("have.value","aliveli")
    });
    it('Whrite something in email area', () => {
        cy.get("input[name=name]").type("aliveli")
        cy.get("input[name=email]").type("ali@veli.com");
        cy.get("input[name=password]").type("123456");
        cy.get("input[name=tc]").check();
        cy.get("input[name=tc]").should("be.checked");
        cy.get("#user-form-btn").should("be.enabled")
        cy.get("#user-form-btn").click()
    });
    it('Whrite something in email area', () => {
        cy.get("input[name=name]").type("aliveli")
        cy.get("input[name=email]").type("aliveli.com");
        cy.get("input[name=password]").type("123456");

        cy.get(".input-error .email-vlaidation-msg").should("be.visible")
        cy.get(".input-error .email-vlaidation-msg").should("have.text")


        cy.get("input[name=tc]").check();
        cy.get("input[name=tc]").should("be.checked");
        // cy.get("#user-form-btn").should("be.enabled")
        // cy.get("#user-form-btn").click()
    });

})