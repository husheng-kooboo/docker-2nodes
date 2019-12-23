@checkout
Feature: Check out
    Check out functions

    Background:
        Given open the homepage
        And click the dames collectie category
    
    @lmhpn
    Scenario: login,mail home,pay now
        Then add product into cart
        And open cart to click check out button
        And choose the login account option
        And input the email address
        And input the password
        And verify the 'login' user information
        And choose mail home as the delivery method
        And choose pay now as the payment method
        And input the user payment information
        And return to modify payment info
        And check out at payment gateway
        And verify the payment order information
    
    @lmhpl   
    Scenario: login,mail home,pay later
        Then add product into cart
        And open cart to click check out button
        And choose the login account option
        And input the email address
        And input the password
        And verify the 'login' user information
        And choose mail home as the delivery method
        And choose pay later as the payment method
        And verify the order information

    @lsfpl  
    Scenario: login,store fetch,pay later
        Then add product into cart
        And open cart to click check out button
        And choose the login account option
        And input the email address
        And input the password
        And verify the 'login' user information
        And choose store fetch as the delivery method
        And choose pay later as the payment method
        And verify the order information

    @lsfpn  
    Scenario: login,store fetch,pay now
        Then add product into cart
        And open cart to click check out button
        And choose the login account option
        And input the email address
        And input the password
        And verify the 'login' user information
        And choose store fetch as the delivery method
        And choose pay now as the payment method
        And input the user payment information
        And return to modify payment info
        And check out at payment gateway
        And verify the payment order information

    @asfpn  
    Scenario: anonymous,store fetch,pay now
        Then add product into cart
        And open cart to click check out button
        And choose the anonymous option
        And input the user information
        And choose store fetch as the delivery method
        And choose pay now as the payment method
        And input the user payment information
        And return to modify payment info
        And check out at payment gateway
        And verify the payment order information

    @asfpl  
    Scenario: anonymous,store fetch,pay later
        Then add product into cart
        And open cart to click check out button
        And choose the anonymous option
        And input the user information
        And choose store fetch as the delivery method
        And choose pay later as the payment method
        And verify the order information

    @amhpl   
    Scenario: anonymous,mail home,pay later
        Then add product into cart
        And open cart to click check out button
        And choose the anonymous option
        And input the user information
        And choose mail home as the delivery method
        And choose pay later as the payment method
        And verify the order information

    @amhpn
    Scenario: anonymous,mail home,pay now
        Then add product into cart
        And open cart to click check out button
        And choose the anonymous option
        And input the user information
        And choose mail home as the delivery method
        And choose pay now as the payment method
        And input the user payment information
        And return to modify payment info
        And check out at payment gateway
        And verify the payment order information
    
    @rmhpn
    Scenario: regist,mail home,pay now
        Then add product into cart
        And open cart to click check out button
        And choose the regist option
        And input the register information
        And input the account information
        And verify the 'registered' user information
        And choose mail home as the delivery method
        And choose pay now as the payment method
        And input the user payment information
        And return to modify payment info
        And check out at payment gateway
        And verify the payment order information

    @rmhpl   
    Scenario: anonymous,mail home,pay later
        Then add product into cart
        And open cart to click check out button
        And choose the regist option
        And input the register information
        And input the account information
        And verify the 'registered' user information
        And choose mail home as the delivery method
        And choose pay later as the payment method
        And verify the order information

    @rsfpl  
    Scenario: anonymous,store fetch,pay later
        Then add product into cart
        And open cart to click check out button
        And choose the regist option
        And input the register information
        And input the account information
        And verify the 'registered' user information
        And choose store fetch as the delivery method
        And choose pay later as the payment method
        And verify the order information

    @rsfpn  
    Scenario: anonymous,store fetch,pay now
        Then add product into cart
        And open cart to click check out button
        And choose the regist option
        And input the register information
        And input the account information
        And verify the 'registered' user information
        And choose store fetch as the delivery method
        And choose pay now as the payment method
        And input the user payment information
        And return to modify payment info
        And check out at payment gateway
        And verify the payment order information