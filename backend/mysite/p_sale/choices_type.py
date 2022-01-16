class Choice:
    listing_type = (
        ('TL','Top Listing Rs.23600'),
        ('pl','Premium Listing Rs.17600'),
        ('FL','Featured Listing Rs.9600'),

    )
    listing_condition = (
        ('Brand New','Brand New'),
        ('Used','Used'),
    )
    area_type = (
        ('Ropani','Ropani'),
        ('Sq,Ft','Sq.Ft'),
        ('Dhur','Dhur'),
        ('Kathha','Kathha'),
        ('Hath','Hath'),
        ('Bigha','Bigha'),
    )

    negotiable_type = (
        ('Yes','Yes'),
        ('No','No')
    )
    furnishing_type = (
        ('Not Furnished','Not Furnished'),
        ('Semi Furnished','Semi Furnished'),
        ('Full Furnished','Full Furnished')
    )
    house_type = (
        ('Flat System','Flat System'),
        ('Single Family','Single Family'),
        ('Commercial','Commercial'),
        ('Apartment Building','Apartment Building')
    )
    face_towards = (
        ('East','East'),
        ('West','West'),
        ('North','North'),
        ('South','South'),
        ('North-East','North-East'),
        ('South-East','Norht-West'),
        ('South-East','South-East'),
        ('South-West','South-West')
    )
    kyc_type = (
        ('pending','pending'),
        ('vrifying','verifying'),
        ('verified','verified')
    )