Vue.component('header-store',{
    template: `
        <div>
        <header class="section-header">
        <nav class="navbar navbar-top navbar-expand-lg navbar-dark bg-secondary">
        <div class="container">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTop" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTop">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#"> <i class="fa fa-phone"></i> Call us: 020 2366 455 </a>
                </li>
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown"> USD </a>
                    <ul class="dropdown-menu small">
                        <li><a class="dropdown-item" href="#">EUR</a></li>
                        <li><a class="dropdown-item" href="#">AED</a></li>
                        <li><a class="dropdown-item" href="#">RUBL </a></li>
                    </ul>
                </li>
                 <li class="nav-item dropdown">
                     <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">   Language </a>
                    <ul class="dropdown-menu small">
                        <li><a class="dropdown-item" href="#">English</a></li>
                        <li><a class="dropdown-item" href="#">Arabic</a></li>
                        <li><a class="dropdown-item" href="#">Russian </a></li>
                    </ul>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li><a href="#" class="nav-link"> My Account </a></li>
                <li><a href="#" class="nav-link"> Wishlist </a></li>
                <li><a href="#" class="nav-link"> Checkout </a></li>
            </ul> 
          </div> 
        </div> 
        </nav>
        
        <section class="header-main">
            <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-5-24 col-sm-5 col-4">
                <div class="brand-wrap">
                    <img class="logo" src="images/logo-dark.png">
                    <h2 class="logo-text">LOGO</h2>
                </div> 
            </div>
            <div class="col-lg-13-24 col-sm-12 order-3 order-lg-2">
                <form action="#">
                    <div class="input-group w-100">
                        <select class="custom-select"  name="category_name">
                                <option value="">All type</option><option value="codex">Special</option>
                                <option value="comments">Only best</option>
                                <option value="content">Latest</option>
                        </select>
                        <input type="text" class="form-control" style="width:60%;" placeholder="Search">
                        
                        <div class="input-group-append">
                          <button class="btn btn-primary" type="submit">
                            <i class="fa fa-search"></i>
                          </button>
                        </div>
                    </div>
                </form> 
            </div> 
            <div class="col-lg-6-24 col-sm-7 col-8  order-2  order-lg-3">
                <div class="d-flex justify-content-end">
                    <div class="widget-header">
                        <small class="title text-muted">Welcome guest!</small>
                        <div> <a href="#">Sign in</a> <span class="dark-transp"> | </span>
                        <a href="#"> Register</a></div>
                    </div>
                    <a href="#" class="widget-header border-left pl-3 ml-3">
                        <div class="icontext">
                            <div class="icon-wrap icon-sm round border"><i class="fa fa-shopping-cart"></i></div>
                        </div>
                        <span class="badge badge-pill badge-danger notify">0</span>
                    </a>
                </div> 
            </div> 
        </div> 
            </div> 
        </section>
        </header> 
        
        </div>    
    `,
    created: function(){

    },
    data: function(){
        return {

        }
    },
    methods: {

    },
    prop:{

    },
    watch:{

    }

});